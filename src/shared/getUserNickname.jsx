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
    console.log('Here (2): ' + JSON.stringify(e));

    return { error: e };
  }
};

export default getUserNickname;
