import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderBoards } from '../states/leaderBoard/action';
import Spinner from '../components/elements/Spinner';

export default function LeaderBoardPage() {
  const { data, loading, error } = useSelector((state) => state.leaderBoards);
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncGetLeaderBoards());
      firstRun.current = false;
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        Terjadi Kesalahan...
      </div>
    );
  }

  return (
    <div className="py-6">
      <div>
        <h1 className="text-base font-semibold text-gray-800">Klasmen Pengguna Aktif</h1>
        { data?.map(({ user, score }) => (
          <div className="border-b border-gray-100 py-4 flex justify-start items-center" key={user.id}>
            <div>
              <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            </div>
            <div className="pl-4">
              <h3 className="font-sm font-medium text-gray-800">{user.name}</h3>
              <p className="font-xs text-gray-600">
                skor:
                {' '}
                {score}
              </p>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}
