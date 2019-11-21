import keys from './keys';

import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
import redis from "redis";

app = express()
app.use(cors())
app.use(bodyParser.json())

const pgClient = Pool({
  user: key.pgUser,
  host: key.pgHost,
  database: key.pgDb,
  password: key.pgPassword,
  port: key.pgPort
});

pgClient.on("error", () => console.log("Lost PG Conn"));
pgClient.query("CREATE TABLE IF NOT EXIST values (number INT)").catch(console.log);

const sub = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const pub = sub.duplicate();

agg.get("/", (req, res) => res.send("HI"));

// the querying is a async process
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  return res.send(values.rows)
});

app.get("/values/current", async (req, res) => {
  // only can use call backs not async await 
  // 
  return sub.hgetall("values", (err, values) => res.send(values));
});

app.post("/values", async (req, res) => {
  // only can use call backs not async await 
  //
  const idx = req.body.index;

  if (parseInt(idx) > 40) return res.status(422).send("value is greater than 40");

  sub.hset("values", idx, "Nothing yet");
  pub.publish("insert", idx);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index])

  return res.send({"working": true});
});

const port = 5000;

app.listen(port, () => console.log(`Running on: ${port}`));
