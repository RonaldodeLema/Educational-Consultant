import { useAuth } from '../../hooks/useAuth';

import { useState } from 'react';
import {updateProfile, fineTune} from '../../apis/makeAxiosReq';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserDetailsRightSide = () => {
	const { user } = useAuth();
	const [updateUser, setUpdateUser] = useState({
		full_name: user.full_name || '',
		email: user.email || '',
		phone: user.phone || '',
		address: user.address || ''
	  });
	const [file, setFile] = useState('');
	const [copySuccess, setCopySuccess] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	  };
	
	const handleSubmitCSV = async (e) => {
		e.preventDefault();
		if (!file) {
			console.error('No file selected.');
			toast.error('No file selected.');
			return;
		  }
		try {
		  await fineTune(file, user.api_key);
		  toast.success('Fine-tune successfully');
		} catch (error) {
		  console.error('Error calling Fine-tune API:', error);
		  toast.error('Error calling Fine-tune:' + error);
		}
	}

	const updateLocalStorageUser = (updatedUser) => {
		// Get the existing user data from localStorage
		const existingUserData = JSON.parse(localStorage.getItem('user')) || {};
	  
		// Merge the updated user data into the existing data
		const newUserData = { ...existingUserData, ...updatedUser };
	  
		// Update the user data in localStorage
		localStorage.setItem('user', JSON.stringify(newUserData));
	};
	  

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
	
		try {
			const response = await updateProfile(user.username, user.api_key, updateUser);
			updateLocalStorageUser({
				...updateUser
			});
			console.log('Profile updated successfully:', response);
	  
			// Notify success
			toast.success('Profile updated successfully');
	  
		  } catch (error) {
			console.error('Error updating profile:', error);
	  
			// Notify failure
			toast.error('Error updating profile');
		  }
		};

	const handleCopyClick = async () => {
		const apiKeyInput = document.getElementById('apiKeyInput');

		if (apiKeyInput) {
			try {
				await navigator.clipboard.writeText(apiKeyInput.value);
				setCopySuccess('API Key copied to clipboard!');
			} catch (error) {
				console.error('Unable to copy to clipboard', error);
				setCopySuccess('Error copying API Key');
			}
		}
	};

	return (
		<div className="col-lg-8">
			<div className="card">
				<div className="card-body">
					<div className="row mb-3">
						<div className="col-sm-3">
							<h6 className="mb-0">Full Name</h6>
						</div>
						<div className="col-sm-9 text-secondary">
							<input
								type="text"
								className="form-control"
								aria-label="username"
								placeholder="Enter your full name"
								value={updateUser.full_name}
								onChange={(e) => setUpdateUser({ ...updateUser, full_name: e.target.value })}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-3">
							<h6 className="mb-0">Email</h6>
						</div>
						<div className="col-sm-9 text-secondary">
							<input
								type="text"
								className="form-control"
								aria-label="useremail"
								placeholder="Enter your email"
								value={updateUser.email}
								onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}

							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-3">
							<h6 className="mb-0">Phone</h6>
						</div>
						<div className="col-sm-9 text-secondary">
							<input
								type="text"
								className="form-control"
								aria-label="userphone"
								placeholder="Enter your phone number"
								value={updateUser.phone}
								onChange={(e) => setUpdateUser({ ...updateUser, phone: e.target.value })}

							/>
						</div>
					</div>
				
					<div className="row mb-3">
						<div className="col-sm-3">
							<h6 className="mb-0">Address</h6>
						</div>
						<div className="col-sm-9 text-secondary">
							<textarea
								type="text"
								className="form-control"
								placeholder="Enter your address"
								// Sample value assignment based on your user object structure
								value={updateUser.address}
								onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })}
							/>
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-sm-3">
							<h6 className="mb-0">API Key</h6>
						</div>
						<div className="col-sm-9 text-secondary">
							<div className="input-group">
								<input
									id="apiKeyInput"
									type="text"
									className="form-control"
									value={user.api_key}
									readOnly
								/>
								<div className="input-group-append">
									<button
										className="btn btn-outline-secondary"
										type="button"
										onClick={handleCopyClick}
									>
										Copy
									</button>
								</div>
							</div>
							{copySuccess && <p className="text-success mt-2">{copySuccess}</p>}
						</div>
					</div>

					<div className="row">
						<div className="col-sm-3"></div>
						<div className="col-sm-9 text-secondary">
							<input type="button" onClick={handleUpdateProfile} className="btn btn-primary px-4" value="Update Profile" />
						</div>
					</div>


				</div>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<div className="card">
						<div className="card-body">
							<h5 className="d-flex align-items-center mb-3">Update your dataset type csv for fine tuning your model.</h5>
							<div className="form-group">
								<div class="input-group mb-3">
									<input
										type="file"
										class="form-control"
										id="inputGroupFile03"
										aria-describedby="inputGroupFileAddon03"
										aria-label="Upload"
										accept='.csv'
										onChange={handleFileChange}

									/>
									<button
										class="btn btn-outline-secondary"
										type="button"

										id="inputGroupFileAddon03"
										onClick={handleSubmitCSV}
									>
										Upload
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer position="top-right" autoClose={3000} />
		</div>
		
	);
};

export default UserDetailsRightSide;
