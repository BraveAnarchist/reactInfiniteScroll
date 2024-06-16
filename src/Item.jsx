export default function Item({data}){
    console.log(data);
    return(
        <main className="flex flex-wrap gap-[2vw] justify-around mx-[1vw] mt-[4vh]">
            {data.map((ele,idx)=>{
                return(
                    <div key={idx} className="min-h-[22vh] min-w-[13vw] border border-slate-950 relative">
                        <img src={ele.urls.small} style={{height:"100%",width:"100%"}} alt="" />
                        <p className="absolute top-0 text-white">{ele.alt_description
                        }</p>
                        <p className="absolute top-8 text-white">{ele.created_at
                        }</p>
                    </div>
                )
            })}
        </main>
    )
}