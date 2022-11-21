export const getCamelCase = (name: string) =>{
    const arr=name.split('');
    let res='';
    arr.map((i)=>{
        let nowi=i.toLowerCase()
        if(nowi!=i){
            res+= '-'+nowi
        }else{
            res+= nowi;
        }
    })
    return res;
}

export default function(props:Object){ 
    let res:string = "";
    for(let [key, value] of Object.entries(props)){
        let nowkey=getCamelCase(key);
        res+=nowkey+":"+value+";"
    }
    return res;
}