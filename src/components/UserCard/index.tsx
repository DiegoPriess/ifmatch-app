import { IUserProps } from './IUserCard';
import './style.scss';

const UserCard = ({
	user: {
		email,
		name,
		profileImg,
		status
	}
}: IUserProps) => {
	const imagem: string = `data:image/jpeg;base64,${profileImg}`;

	return (
		<div className="user-card">
			<div className="user-img-content">
				<img className="user-img" src={imagem} />
			</div>
			<div className="user-info">
				<p>Nome: {name}</p>
				<p>Email: {email}</p>
				<p>Status: {status === "AGUARDANDO_ATENDIMENTO" ? "Aguardando Atendimento" : "Atendido"}</p>
			</div>
		</div>
	);

}

export default UserCard;