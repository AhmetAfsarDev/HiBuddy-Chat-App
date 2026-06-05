import React from 'react'

function Messagebox() {
  return (
    <div className='MessageBox-container' >
      <div className="Userscontainer">

        <ul className='Activeuserlist' >
          <h3>Aktif Kullanıcılar</h3>


          <li className='Activeuser' >
            <a className='User' href="#">


            <div className='Profileinfo'>
              <img className='Userprofilephoto' src="./public/ProfilPicture.png"alt="pp"></img>
              <span className='Username'>Ahmet</span>
              </div>

              <span className='Onlinecheck' >Çevrimiçi 🟢</span>
              

           </a>
        </li>



      
      </ul>
        </div>



      <div className="Messagecontainer">
        <div className='Messagewrapper'>
          <ul className='Messagelistwrapper' >

                 
                <li className='MMessage'>
                  <div><img className='Userprofilephoto' src="./public/ProfilPicture.png"alt="pp"></img> <span className='Username' >Ahmet</span></div>


                  <div className="messageitembox">
                     <a className='MMessageitem'>Bu benim meBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımBu benim mesajımsajım</a>
                  </div>
                  <div className='Date' ><h6 className='Clock'>22:15 <span>|</span> </h6> <h6 className='day'> <span></span>11 </h6><h6 className='Mount'> <span>|</span> <span></span>5</h6><h6 className='Year'> <span>|</span> <span></span>2026</h6></div>
                </li>

                        
           </ul>
        </div>

           

        <div className='inputcontainer'>
            <input className='Messageinput' type='text' placeholder='Ne düşünüyorsun...'></input>
            <button className='MessageSendbtn' ><i className="fa-solid fa-location-arrow fa-xl"></i></button>
        </div>
      </div>

    </div>
  )
}

export default Messagebox