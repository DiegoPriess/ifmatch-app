import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import TextField from "@mui/material/TextField";
import './style.scss';
import { User } from '../../interfaces/User';
import { api } from '../../api/api';

const Users = () => {

      const [name, setName] = useState("");
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const [profileImg, setProfileImg] = useState<string | null>(null);

      const handleImageUpload = (e: any) => {
        setProfileImg(e.target.files[0] as string | null);
      };

      const config = {
        headers: {                  
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization", 
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
            "Content-Type": "application/json;charset=UTF-8"                   
        },
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const user: User = {
            idUser: 0,
            status: "FORA_CLINICA",
            name: name,
            password: password,
            email: email,
            profileImg: profileImg ? profileImg : "",
        };

        api.post<any>(`user`, user, config);
   
        console.log("Usuário a ser adicionado:", user);
      };

    return (
        <div className="content">
            <NavBar />
            <div className="users">
                <div className="users-content">
                <form onSubmit={handleSubmit}>
                    <TextField id="name" label="Nome" variant="outlined" value={name} onChange={event => { setName(event.target.value) }}/>
                    <TextField id="email" label="E-mail" variant="outlined" value={email} onChange={event => { setEmail(event.target.value) }}/>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={password} 
                        onChange={event => { setPassword(event.target.value) }}
                        autoComplete="current-password"
                    />
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <button type="submit">Adicionar Usuário</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Users;