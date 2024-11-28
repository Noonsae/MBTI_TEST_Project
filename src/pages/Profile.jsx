import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserProfile, updateProfile } from "../api/auth";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setNickname(profile.nickname);
      } catch (error) {
        handleProfileError(error, "프로필 정보를 불러오지 못했습니다.");
      }
    };
    fetchProfile();
  }, []);

  // 닉네임 업데이트 함수
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = getUserFromLocalStorage();
      if (!user) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const updatedProfile = await updateProfile(nickname);
      updateUserInLocalStorage({ ...user, nickname: updatedProfile.nickname });
      toast.success("프로필이 성공적으로 업데이트되었습니다!");
    } catch (error) {
      handleProfileError(error, "프로필 업데이트에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 로컬 스토리지에서 사용자 정보 가져오기
  const getUserFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  };

  // 로컬 스토리지 사용자 정보 업데이트
  const updateUserInLocalStorage = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // 프로필 오류 처리 함수
  const handleProfileError = (error, message) => {
    console.error(message, error.response?.data || error.message);
    toast.error(message);
  };

  return (
    <div>
      <div>
        <h2>프로필 수정</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "업데이트 중..." : "프로필 업데이트"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;