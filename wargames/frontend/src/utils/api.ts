import axios from 'axios';
import config from '../../config.json';

export const getLeaderboard = async () => {
  const data = await axios({
    method: 'get',
    url: "http://wargames.wcewlug.org:8888/leaderboard",
    headers: {},
  });

  return JSON.stringify(data['data'], null, 2);
};

export const getStats = async (username) => {
  const data = await axios({
    method: 'post',
    url: "http://wargames.wcewlug.org:8888/stats",
    headers: {}, 
    data: {
      username: username,
    }
  });

  return JSON.stringify(data['data'], null, 2);
};

export const submitFlag = async (username, flag) => {

  const data = await axios({
    method: 'post',
    url: "http://wargames.wcewlug.org:8888/verify",
    headers: {}, 
    data: {
      username: username,
      flag: flag
    }
  });

  return JSON.stringify(data['data'], null, 2);
};
