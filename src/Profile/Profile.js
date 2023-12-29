import React, {useEffect} from 'react';
import './Profile.css'
import BasicModal from "./profile-update-modal";
import userApis from "../Apis/UserApis/UserApis";
// import {getUserId, isTheUserAnAdmin} from "../Authentication/UserAuthentication";
import {ProfileSideMenu} from "./ProfileSideMenu";
import {ProfileAttributeComponent} from "./ProfileAttributeComponent";
import {getUserId} from "../Authentication/UserAuthentication";


function Profile() {

    const [profileAttributes, setProfileAttributes] = React.useState({
        firstName:"faris",
        lastName:"mohamed",
        email:"Faris007@gmail.com",
        role:"Adopter",
        gender:"Male",
        phoneNumber:"01204554352",
    });

    useEffect(() => {
        const sendInformationRequest = async() => {
            try {
                const response = await userApis.get("getUserDto/"+getUserId());
                console.log(response);
                setProfileAttributes(response.data)
            } catch (error) {
                // alert(error)
                alert(error.response.data.message)
            }
        }
        sendInformationRequest()
    }, []);

    return (
        <div className="profile-container">
            <ProfileSideMenu profileAttributes={profileAttributes} />
            <div className="profile-main-content">
                <div className="profile-main-content-header">
                    <div className="header-title">
                        Profile
                    </div>
                    <div className="header-btns">
                        <BasicModal
                            defaultFirstName={profileAttributes.firstName}
                            defaultGender={profileAttributes.gender}
                            defaultLastName={profileAttributes.lastName}
                            defaultPaypalAccount={profileAttributes.phoneNumber}/>
                    </div>
                </div>
                <div className="profile-main-content-body">
                    <ProfileAttributeComponent attributeName="Email" attributeValue={profileAttributes.email} />
                    <ProfileAttributeComponent attributeName="First Name" attributeValue={profileAttributes.firstName} />
                    <ProfileAttributeComponent attributeName="Last Name" attributeValue={profileAttributes.lastName} />
                    <ProfileAttributeComponent attributeName="Role" attributeValue={profileAttributes.role} />
                    <ProfileAttributeComponent attributeName={"Gender"} attributeValue={profileAttributes.gender} />
                    <ProfileAttributeComponent attributeName="Phone Number" attributeValue={profileAttributes.phoneNumber} />
                </div>
            </div>
        </div>
    );
}

export default Profile;