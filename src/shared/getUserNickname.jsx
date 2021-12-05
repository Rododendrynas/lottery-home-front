const getUserNickname = async (userId, token) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + '/v1/content/account/' + userId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    const json = await response.json();

    return json;
  } catch (e) {
    console.log('Error by getting user nickname ' + JSON.stringify(e));

    return { error: e };
  }
};

export default getUserNickname;
