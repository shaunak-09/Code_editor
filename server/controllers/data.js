const connection = require("../db");
const con = connection.promise();
const redisClient = require("../redis");
const axios = require("axios");

const submit = async (req, res) => {
  const { username, language, stdin, sourceCode } = req.body;
  const { langId } = req.query;
  // console.log(langId);
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  //   const truncatedSourceCode = sourceCode.slice(0, 100); // Limit source code to 100 characters

  try {
    // console.log(sourceCode);
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE_KEY,
        "X-RapidAPI-Host": process.env.JUDGE_HOST,
      },
      data: {
        language_id: langId,
        source_code: JSON.stringify(sourceCode),
        stdin: stdin,
      },
    };

    const response = await axios.request(options);
    // console.log(response.data);
    const output_token = response.data.token;
    // console.log(output_token);

    const options1 = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${output_token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": process.env.JUDGE_KEY,
        "X-RapidAPI-Host": process.env.JUDGE_HOST,
      },
    };

    const response1 = await axios.request(options1);
    // console.log(response1.data);
    var output;
    if (response1.data.stdout == null)
      output = response1?.data?.status?.description;
    else output = response1.data.stdout;

    console.log(output);

    const truncatedSourceCode = sourceCode.slice(0, 100);
    const sql =
      "INSERT INTO user (username, language, stdin, source_code,output,timestamp) VALUES (?, ?, ?, ?,?, ?)";
    const values = [
      username,
      language,
      stdin,
      truncatedSourceCode,
      output,
      timestamp,
    ];
    await con.query(sql, values);
    console.log("Code snippet submitted successfully");
    const redisKey = "code_snippets";
    const cachedData = await redisClient.GET(redisKey);
    // console.log(result);
    if (cachedData) {
      const previousdata = JSON.parse(cachedData);
      const value = {
        username,
        language,
        stdin,
        source_code: truncatedSourceCode,
        output,
        timestamp,
      };
      previousdata.push(value);
      const updatedDataString = JSON.stringify(previousdata);
      redisClient.SETEX(redisKey, 3600, updatedDataString);
      console.log("cached data updated");
    }

    res.status(201).json({ message: "Code snippet submitted successfully" });
  } catch (err) {
    console.error("Error submitting code snippet:", err);
    res.status(500).json({ error: "Error submitting code snippet" });
  }
};

const snippets = async (req, res) => {
  try {
    const redisKey = "code_snippets";
    const cachedData = await redisClient.GET(redisKey);
    if (cachedData) {
      console.log("Snippet 1 fetched");
      const snippets = JSON.parse(cachedData);
      res.status(200).json({data:snippets,message:"Snippets fetched"});
    } else {
      const sql =
        "SELECT username, language, stdin, source_code,output, timestamp FROM user";

      const results = await con.query(sql);

      if (results[0].length == 0) {
        res.status(404).json({ error:"No snippet found"});
      } else {
        redisClient.SETEX(redisKey, 3600, JSON.stringify(results[0]));
        console.log("Snippet 2 fetched");
        res.status(200).json({data:results[0],message:"Snippets fetched"});
      }
    }
  } catch (err) {
    console.error("Error fetching code snippets:", err);
    res.status(500).json({ error: "Error fetching code snippets" });
  }
};

module.exports = { submit, snippets };
