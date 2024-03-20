const connection=require('../db')
const con=connection.promise()
const submit=async(req,res)=>{
  const { username, codeLanguage, stdin, sourceCode } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');;
  const truncatedSourceCode = sourceCode.slice(0, 100); // Limit source code to 100 characters

  const sql = 'INSERT INTO user (username, language, stdin, source_code, timestamp) VALUES (?, ?, ?, ?, ?)';
  const values = [username, codeLanguage, stdin, truncatedSourceCode, timestamp];
 try{
    await con.query(sql, values)
    console.log('Code snippet submitted successfully');
    res.status(201).json({ message: 'Code snippet submitted successfully' });
}
catch(err){
    console.error('Error submitting code snippet:', err);
    res.status(500).json({ error: 'Error submitting code snippet' });
}
 
}

const snippets=async(req,res)=>{
    const sql = 'SELECT username, language, stdin, source_code, timestamp FROM user';
    try{
    const results= await con.query(sql)
      console.log('Code snippets fetched successfully');
      if(results[0].length==0)
      {res.status(202).json('No snippet found')}
      else 
      res.status(200).json(results[0]);
    }
    catch(err)
    {
        console.error('Error fetching code snippets:', err);
        res.status(500).json({ error: 'Error fetching code snippets' });

    }

}

module.exports={submit,snippets}
