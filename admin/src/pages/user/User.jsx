import {
    CalendarToday,
    // LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
import "./user.css";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
// import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";


export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  console.log(userId);

 

  const [user, setUser] = useState({});
  const [stats, setStats] = useState([]);
  
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get(`/users/find/${userId}`);
        console.log(res.data);
        setUser(res.data);
      } catch {}
    }
    getUser();

    const getStats = async () => {
      try {
        const res = await userRequest.get(`/orders/income?uid=${userId}`);
        res.data.map((item) =>
          setStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    }

    getStats();
  }, [userId, MONTHS]);


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className = "userStats">
          <Chart data={stats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user.email}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address}
                  className="userUpdateInput"
                />
              </div> */}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilePic || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}






  
  // export default function User() {
  //   return (
  //     <div className="user">
  //       <div className="userTitleContainer">
  //         <h1 className="userTitle">Edit User</h1>
  //         <Link to="/newUser">
  //           <button className="userAddButton">Create</button>
  //         </Link>
  //       </div>
  //       <div className="userContainer">
  //         <div className="userShow">
  //           <div className="userShowTop">
  //             <img
  //               src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  //               alt=""
  //               className="userShowImg"
  //             />
  //             <div className="userShowTopTitle">
  //               <span className="userShowUsername">Anna Becker</span>
  //               <span className="userShowUserTitle">Software Engineer</span>
  //             </div>
  //           </div>
  //           <div className="userShowBottom">
  //             <span className="userShowTitle">Account Details</span>
  //             <div className="userShowInfo">
  //               <PermIdentity className="userShowIcon" />
  //               <span className="userShowInfoTitle">annabeck99</span>
  //             </div>
  //             <div className="userShowInfo">
  //               <CalendarToday className="userShowIcon" />
  //               <span className="userShowInfoTitle">10.12.1999</span>
  //             </div>
  //             <span className="userShowTitle">Contact Details</span>
  //             <div className="userShowInfo">
  //               <PhoneAndroid className="userShowIcon" />
  //               <span className="userShowInfoTitle">+1 123 456 67</span>
  //             </div>
  //             <div className="userShowInfo">
  //               <MailOutline className="userShowIcon" />
  //               <span className="userShowInfoTitle">annabeck99@gmail.com</span>
  //             </div>
  //             <div className="userShowInfo">
  //               <LocationSearching className="userShowIcon" />
  //               <span className="userShowInfoTitle">New York | USA</span>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="userUpdate">
  //           <span className="userUpdateTitle">Edit</span>
  //           <form className="userUpdateForm">
  //             <div className="userUpdateLeft">
  //               <div className="userUpdateItem">
  //                 <label>Username</label>
  //                 <input
  //                   type="text"
  //                   placeholder="annabeck99"
  //                   className="userUpdateInput"
  //                 />
  //               </div>
  //               <div className="userUpdateItem">
  //                 <label>Full Name</label>
  //                 <input
  //                   type="text"
  //                   placeholder="Anna Becker"
  //                   className="userUpdateInput"
  //                 />
  //               </div>
  //               <div className="userUpdateItem">
  //                 <label>Email</label>
  //                 <input
  //                   type="text"
  //                   placeholder="annabeck99@gmail.com"
  //                   className="userUpdateInput"
  //                 />
  //               </div>
  //               <div className="userUpdateItem">
  //                 <label>Phone</label>
  //                 <input
  //                   type="text"
  //                   placeholder="+1 123 456 67"
  //                   className="userUpdateInput"
  //                 />
  //               </div>
  //               <div className="userUpdateItem">
  //                 <label>Address</label>
  //                 <input
  //                   type="text"
  //                   placeholder="New York | USA"
  //                   className="userUpdateInput"
  //                 />
  //               </div>
  //             </div>
  //             <div className="userUpdateRight">
  //               <div className="userUpdateUpload">
  //                 <img
  //                   className="userUpdateImg"
  //                   src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  //                   alt=""
  //                 />
  //                 <label htmlFor="file">
  //                   <Publish className="userUpdateIcon" />
  //                 </label>
  //                 <input type="file" id="file" style={{ display: "none" }} />
  //               </div>
  //               <button className="userUpdateButton">Update</button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }