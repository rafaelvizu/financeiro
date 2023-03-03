import cronn from 'node-cron';
import fs from 'fs';

function deleteFile(path: string) : void {
    fs.unlink(path, (err) => {
        if (err) {
            console.log(`deleteFile: ${err}`);
            return;
        }
        console.log(`clearSessionTask: File ${path} deleted!`);
    });

}

function searchFiles(path:string) : (string[] | void)
{
     try 
     {
          return fs.readdirSync(path);
     }
     catch (err)
     {
          console.log(`searchFiles: ${err}`);
          return;
     }
}

export function clearSessionTask(SESSION_TIME_LIFE: number)
{
     cronn.schedule('*/10 * * * * *', () => {
          const files:(string[] | void) = searchFiles('./sessions');

     
          if (!files) return;

          files.forEach((file) => {
               fs.stat(`./sessions/${file}`, (err, stats) => {
                    if (err) {
                         console.log(`clearSessionTask: ${err}`);
                         return;
                    }

                    const now:number = new Date().getTime();
                    const endTime:number = new Date(stats.ctime).getTime() + SESSION_TIME_LIFE;
                    const expireTime:number = endTime - now;

                    
                    if (expireTime <= 0) {
                         deleteFile(`./sessions/${file}`);
                    }

               });

          });

     });
}


export function clearSessionSelect(id:string)
{
     const files:(string[] | void) = searchFiles('./sessions');

     if (!files) return;


     files.forEach((file) => {
          fs.readFile(`./sessions/${file}`, (err, data) => {
               if (err) 
               {
                    console.log(`clearSessionSelect: ${err}`);
                    return;
               }

               const session = JSON.parse(data.toString());

               if (session.userid == id)
               {
                    deleteFile(`./sessions/${file}`);
               }
          })


     });
}
