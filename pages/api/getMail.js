import { google } from "googleapis";

export default async function getmail(req,res){
    if(req.method !== 'POST'){
        res.status(405).json({message:"Method not allowed"});
    }

    var arr = [];

    const {access_token} = req.body;    
    //console.log("I'm access_token",access_token);
    const auth = new google.auth.OAuth2();
    auth.setCredentials({access_token:access_token});
    const gmail = google.gmail({version:'v1',auth});
    const response = await gmail.users.messages.list({
        userId:'me',
        maxResults:20,
    })
    const result = response.data;
    const message = result?.messages || [];
    const emails = await Promise.all(
        message.map(async (message)=>{
            const msg = await gmail.users.messages.get({
            userId:'me',
            id:message.id,
            })
            const payload = msg.data.payload;
            const headers = payload.headers;
            const parts = payload.parts;
            let subject = '';
            let body = '';
            
            headers.forEach(headers=>{
                if(headers.name === 'Subject'){
                    subject = headers.value;
                }
            });
            if(parts){
                parts.forEach(part=>{
                    if(part.mimeType === 'text/plain'){
                        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
                    }
                });
            }else{
                body = payload.body ? Buffer.from(payload.body.data, 'base64').toString('utf-8') : '';
            }

            
            const bodyContent = body
                .replace(/\\r\\n/g, '\n')
                .replace(/\\n/g, '\n')
                .replace(/\\'/g, "'")
                .replace(/ +/g, ' ')
                .trim();
                
            return {id:message.id , subject: subject , body:bodyContent};

        }),
    );
    

    

    console.log("Bpdyyyy",emails);
    //console.log("Mails",result.messages[0]);
    res.status(200).json({Message:emails});
}