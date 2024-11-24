function ProfilePage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl'>
        <div className='relative'>
          <img
            src='https://placehold.co/1200x300'
            alt='Background'
            className='w-full h-48 object-cover'
          />
          <div className='absolute top-4 left-4'>
            <img
              src='https://placehold.co/100x100'
              alt='Profile'
              className='rounded-full border-4 border-white'
            />
          </div>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-2xl font-bold'>Jaydon Frankie</h1>
            <p className='text-sm'>CTO</p>
          </div>
        </div>
        <div className='flex justify-around items-center p-4 border-t'>
          <div className='flex flex-col items-center'>
            <i className='fas fa-user text-gray-600'></i>
            <span className='text-sm text-gray-600'>Profile</span>
          </div>
          <div className='flex flex-col items-center'>
            <i className='fas fa-heart text-gray-600'></i>
            <span className='text-sm text-gray-600'>Followers</span>
          </div>
          <div className='flex flex-col items-center'>
            <i className='fas fa-users text-gray-600'></i>
            <span className='text-sm text-gray-600'>Friends</span>
          </div>
          <div className='flex flex-col items-center'>
            <i className='fas fa-images text-gray-600'></i>
            <span className='text-sm text-gray-600'>Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
