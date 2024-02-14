const connection=require('../database/index.js')


const getAll=(callback)=>{
    const query='SELECT * FROM postes'
    connection.query(query,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}

const getOne=(id,callback)=>{
    const query='SELECT FROM postes WHERE id=?'
    connection.query(query,[id],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const add=(newsData,callback)=>{
    const{title,image,description,date}=newsData
    const query='INSERT INTO postes SET ?'
    connection.query(query,newsData,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const Delete=(newsId,callback)=>{
    const query='DELETE FROM postes WHERE id=?'
    connection.query(query,newsId,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const update=(newsId,newsData,callback)=>{
    const {title,image,description,date}=newsData
    const query= 'UPDATE  postes SET  title=?,description=?  WHERE id= ? '
    connection.query(query,[title,image,description,date,newsId],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const searchByTitle = (searchTerm, callback) => {
    const query = 'SELECT * FROM postes WHERE title LIKE ?';
    const searchValue = `%${searchTerm}%`; // To search for titles containing the searchTerm
    connection.query(query, [searchValue], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports={
    getAll,
    getOne,
    add,
    Delete,
    update,
    searchByTitle
}