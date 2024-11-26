import React, { useState } from "react";
import { updateProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfile(nickname, user.accessToken);
      if (data.success) {
        alert("성공");
        setUser({ ...user, nickname, avatar: data.avatar });
        navigate("/");
      }
    } catch (error) {
      alert("failed");
    }
  };

  return (
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="수정할 닉네임을 입력하세요"
            />
          </div>
          <div>
            <label>프로필 이미지</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
