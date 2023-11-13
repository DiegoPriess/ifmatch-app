import { useRef, useState } from 'react';
import NavBar from '../../components/NavBar';
import TextField from "@mui/material/TextField";
import './style.scss';
import { User } from '../../interfaces/User';
import { api } from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Button from '@mui/material/Button';

const Users = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [profileImg, setProfileImg] = useState<string | null>(null);
	const [profileImgName, setProfileImgName] = useState("");

	const fileToBase64 = (file: File, callback: (base64String: string) => void) => {
		const reader = new FileReader();
		
		reader.onload = () => {
			const base64String = reader.result as string;
			callback(base64String.replace("data:image/jpeg;base64,", ""));
		};
		
		reader.readAsDataURL(file);
	}

	const handleImageUpload = (e: any) => {
		setProfileImgName(e.target.files[0].name);
		fileToBase64(e.target.files[0], (base64String) => {
			setProfileImg(base64String);
		});
	};

	const resetForm = () => {
		setName("");
		setPassword("");
		setEmail("");
		const fileInput = document.getElementById('file-input') as HTMLInputElement;
		if (fileInput) {
		fileInput.value = '';
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const user: any = {
			idUser: 0,
			status: { "name": "FORA_CLINICA" },
			name: name,
			password: password,
			email: email,
			profileImg: profileImg ? profileImg : "",
		};

		api.post<User[]>(`user`, user)
			.then(() => {
				resetForm();
				toast.success("Usuário criado com sucesso!");
			})
			.catch(() => toast.error("Erro ao criar usuário!"));

	};

	
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
	const [showVideo, setShowVideo] = useState(false);
	
	const openCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.current) {
			  videoRef.current.srcObject = stream;
			}
			setMediaStream(stream);
			setShowVideo(true)
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
	};
	
	const captureImage = () => {
		if (videoRef.current) {
		const canvas = document.createElement('canvas');
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(videoRef.current, 0, 0);
				const capturedImageData = canvas.toDataURL('image/jpeg');
				setProfileImg(capturedImageData.replace("data:image/jpeg;base64,", ""));
				setProfileImgName("Imagem capturada pela câmera");
				setShowVideo(false);
				stopCamera();
			}
		}
	};

	const stopCamera = () => {
		if (mediaStream) {
		  mediaStream.getTracks().forEach((track) => {
			track.stop();
		  });
		  setMediaStream(null);
		}
	  };

	return (
		<div className="content">
			<NavBar />
			<div className="users">
				<div className="users-content">
					<div className="inputs-group">
						<TextField id="name" label="Nome" variant="outlined" value={name} onChange={event => { setName(event.target.value) }} />
						<TextField id="email" label="E-mail" variant="outlined" value={email} onChange={event => { setEmail(event.target.value) }} />
					</div>
					<div className="inputs-group">
						<TextField
							id="outlined-password-input"
							label="Password"
							type="password"
							value={password}
							onChange={event => { setPassword(event.target.value) }}
							autoComplete="current-password"
						/>
						<label htmlFor="file-input" className="input-file">{profileImg ? <span><i className="item-icon material-icons">done</i>{profileImgName}</span> : <span><i className="item-icon material-icons">add</i>Adicionar Imagem</span> }</label>
						<input id="file-input" name="file-input" type="file" accept="image/*" onChange={handleImageUpload} />
					</div>
					
					<div className='capture-image'>
						<div className='capture-image-buttons'>
							<button onClick={openCamera}>Abrir câmera</button>
							<button onClick={captureImage}>Capturar Foto</button>
						</div>
						<video ref={videoRef} hidden={!showVideo} autoPlay muted/>
					</div>

					<Button onClick={handleSubmit} className="create-user-button" variant="contained">Criar</Button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Users;