var mysql=require('mysql');
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var conn= mysql.createConnection({
	host: "localhost",
	user:"root",
	password:"Denil9196"
});
var mailer=require('nodemailer');
var transport=mailer.createTransport({
	service:'yahoo',
	auth:
	{

		//please enter mail id and password from which you want to send mail
		///mail id
		user:"denilnair@gmail.com",
		//password
		pass:"Nair9196@"
	}
	});
app.use(bodyParser.urlencoded({ extended: false }));//use to take data from form in JSON format
//app.use('/node_modules',express.static(__dirname+'/node_modules'));
app.use(express.static(__dirname+'/templates'))//allow express to use file from templates folder(html file)
//by default connect port 3000 ro home.html
app.get('/',function(req,res){
	res.sendFile('user-form.html',{'root':__dirname+'/templates'});
});
app.post('/post-feedback',function(req,res){
	console.log("data taken");
	var mobile=req.body.number;
	if(!(mobile.toString().length==10))
	{

		console.log("wrong");
		res.sendFile('/fail.html',{'root':__dirname+'/templates'});
		
		//function timer(){
		//	res.sendFile('/user-form.html',{'root':__dirname+'/templates'});
		//}
	}
	else
	{
		console.log("data taken and authenticated");
		res.sendFile('/pass.html',{'root':__dirname+'/templates'});
		var details={
					from:"denilnair@yahoo.com",
					to:req.body.email,
					subject:"FORM DATA",
					text:"Name: "+req.body.name+"\n"+"Date of Birth: "+req.body.bday+"\n"+"Email ID: "+req.body.email +"\n"+"Mobile Number: "+req.body.number 
					};
		transport.sendMail(details,function(err,info)
									{
										if(err)
										{
											console.log("error");
										}
										else
										{
											console.log("Email sent"+info.response);
											//res.sendFile('/passwithmail.html',{'root':__dirname+'/templates'});
											//console.log("connected");
											//conn.query("update nodemysql set password= ? where email= ?",[password,data[0].email]) 
											
											res.send("email sent");
										}
									});
	}

});

var server=app.listen(process.env.PORT||8080,function(){
	var port=server.address().port;
	console.log("Node server is running at port "+port);
});
