import axios from 'axios';
import React, { useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UploadPost = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const handlePost = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data : imageData } = await axios.post('/api/upload/postimage', {image});
            await axios.post('/api/posts', {
                userId: user._id,
                image: imageData,
                description,
            });
            setLoading(false);
            toast.success('You post has been post.');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }
  return (
    <div className='max-w-3xl mx-auto mt-20 px-3'>
        <form action="" onSubmit={handlePost}>
            {image ? (
                <div className="profile-image-container">
                    <img src={image} alt="" />
                </div>
            ): (
                <div className="border p-5">
                    <label htmlFor="image" className='mx-auto'>
                        <MdOutlineAddPhotoAlternate className='mx-auto text-5xl my-5' />
                        <p className="text-2xl mb-5">Add your photo</p>
                    </label>
                    <input type="file" id="image" className='hidden' onChange={handleChangeImage}/>
                </div>
            )}

            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full focus:outline-none border mt-3' rows='10' placeholder='Description...'></textarea>
            <div className="flex justify-end my-3">
                {loading ? (
                    <button className=" py-2 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 cursor-wait">
                        Posting
                    </button>
                ) : (
                    <button type="submit" className=" py-2 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 focus:from-purple-400 focus:via-pink-400 focus:to-yellow-400 duration-300">
                        Post
                    </button>
                )}
            </div>
        </form>
    </div>
  )
}

export default UploadPost