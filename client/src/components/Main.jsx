import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Url from "./Url";
import CreateArea from "./CreateArea";
import Axios from "axios";

function Main(props) {
    const [urls, setUrls] = useState([{url: "", note: ""}]);
    const [login, setLogin] = useState(false);
    const [query,setQuery]= useState("");
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    Axios.defaults.credentials = 'include';

    useEffect(() => {
        Axios.get(`http://localhost:4000/api/get/${props.user}`).then((response) => {
            setUrls(response.data)
        }, [props.user])
    })
    function addUrl(newUrl, newNote) {
        newUrl.length !== 0 &&
            setUrls(prev => {
                return [...prev, {newUrl, newNote}];
            });
    }
    function queryChange(event){
        setQuery(event.target.value)
    }


    return (
        <div>
            <Header user={props.user} />
            <CreateArea user={props.user} onAdd={addUrl} />
            {(urls.length !== 0) ?
            <div>
                <input className="search form-control" type="text" placeholder="🔍 search here" onChange={queryChange} value={query} />
                <table class="table table-striped my_table">
                    <thead>
                        <tr>
                            <th scope="col">Full URL</th>
                            <th scope="col">Short URL</th>
                            <th scope="col">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                    {urls.filter(url=>url.note.includes(query)).map((urlItem, index) => {
                        return (
                            <Url
                                key={index}
                                id={index}
                                full={urlItem.full}
                                short={urlItem.short}
                                note={urlItem.note}
                            />
                        );
                    }) }
                    </tbody>
                    
                </table>
            </div>
            :
                    <Footer />
                }

        </div>
    )
}

export default Main;