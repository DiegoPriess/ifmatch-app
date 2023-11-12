import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { api } from '../../api/api';
import './style.scss';
import UserCard from '../../components/UserCard';
import { User } from '../../interfaces/User';

const Dashboard = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		console.log("render");

		api.get<User[]>(`user`)
			.then((response) => setUsers(response?.data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="content">
			<NavBar />
			<div className="dashboard">
				<div className="dashboard-content">
					{
						users.length ?
							users.map((user: User) => {
								return <UserCard user={user} />
							})
							: <p className="empty">Nenhuma conta encontrada</p>
					}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;