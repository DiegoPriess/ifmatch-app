import './style.scss';

const UserCard = (props: any) => {
    
    let imagem = `data:image/jpeg;base64,${props.user.profileImg}`;

    return (
        <div className="user-card">
            <div className="user-img-content">
                <img className="user-img" src={imagem} />
            </div>
            <div className="user-info">
                <p>Nome: {props.user.name}</p>
                <p>Email: {props.user.email}</p>
                <p>Status: {props.user.status === "AGUARDANDO_ATENDIMENTO" ? "Aguardando Atendimento" : "Atendido"}</p>
            </div>
        </div>
    );

}

export default UserCard;