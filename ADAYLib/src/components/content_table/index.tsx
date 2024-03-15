import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {SunIcon,MoonIcon} from '@radix-ui/react-icons'
import { KeyboardEvent } from "react"



export function ContentTable(){
    const ENDPOINT = 'https://adaylib-serv.shrshishoshchov.repl.co'
    const [content,setContent] = useState([]);
    const [theme, setTheme] = useState(sessionStorage.getItem('theme') || 'day');


    

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-theme", theme);
        sessionStorage.setItem('theme',theme)
        
      }, [theme]);
    

    const toggleTheme = () => {
        setTheme(theme === "day" ? "night" : "day");
    };

    
    
    
    

    const getData = async() => {
        
        const searchParams = new URLSearchParams(window.location.search);
        const folder_param = searchParams.get('path');
        const search_param = searchParams.get('search');
        console.log(folder_param);
        
        
        if (folder_param!=null) {
                
                const resp = await fetch(`${ENDPOINT}/content?path=${folder_param}`);
                const data = await resp.json();
                console.log('selected book');
                setContent(data);
            }
                  
        else if (search_param!=null){
            const resp = await fetch(`${ENDPOINT}/searchBook/${search_param}`);
            const data = await resp.json();
            console.log('search book');
            setContent(data);
            
        }else{
            console.log('all content');

            const resp = await fetch(`${ENDPOINT}/content?path=`);
            const data = await resp.json()
            
            setContent(data) 
        }
       }
    

    

    

    useEffect(()=>{
       getData()
    },[]);

    async function Search() {
        let search_text = document.getElementById('search_input') as HTMLInputElement;
        window.location.href=`?search=${search_text.value}`
        // await searchData(search_text.value)
        
    }

    function HandleSearch(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
          Search()
        }
    }

    function HandleFolder(filename:string) {
        const searchParams = new URLSearchParams(window.location.search);
        const myParam = searchParams.get('path');
        let ph
        if (myParam!=null){
            ph = myParam+'/'+filename
        }else{
            ph = filename
        }
        
        
        // ph = btoa(unescape(encodeURIComponent(ph)))
        window.location.href = `?path=${ph}`
    }

    

    

    function TableElement(filename:string) {
        if (filename.includes('.pdf') || filename.includes('.fb2') || filename.includes('.doc') || filename.includes('.djvu') || filename.includes('.cbr') || filename.includes('.PDF')) {
            return <TableCell className="text-right"><a href={`${ENDPOINT}/getBook/${filename}`}>Download</a></TableCell>
        }else{
            return <TableCell className="text-right"  id={filename}><a  onClick={()=>HandleFolder(filename)} className="cursor-pointer">Go</a></TableCell>
        }
    }
    
    return (
        <div>
            <div className="w-screen flex">
                <div className="w-1/3 m-auto mt-4 flex justify-between">
                    <Input type="text" placeholder="Search" className="w-4/5" id="search_input" onKeyDown={HandleSearch}/> 
                    <Button type="submit" variant="outline" onClick={Search}>Search</Button>
                </div>
                <div className=" mr-10 mt-4 hover:bg-slate-200 rounded-3xl p-2" onClick={toggleTheme}>
                    {theme=='day' && (<SunIcon className="w-6 h-6"/>)}
                    {theme=='night' && (<MoonIcon className="w-6 h-6"/>)}
                    
                </div>
            </div>
            <Table className="w-2/3 m-auto mt-10">
            <TableCaption>🤐🤐  ADAY LIBRUARY   🤐🤐</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Название</TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!content ? "Loading..." : content.map((filename,index)=>(
                    <TableRow key={index}>
                        <TableCell className="font-medium w-2/3">{filename}</TableCell>
                            {TableElement(filename)}
                        
                        
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    )
}