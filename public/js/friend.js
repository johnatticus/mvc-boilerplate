const friendFormHandler = async function (event) {
  event.preventDefault()

  const friendId = document.querySelector('input[name="friend-id"]').value
  const friendName = document.querySelector('input[name="friendName"]').value
  // const firstNameEl = document.querySelector('textarea[name="friend-body"]').value
  // const lastNameEl = document.querySelector('textarea[name="friend-body"]').value

  console.log(friendId)
  console.log(friendName)

  const response = await fetch('/api/profile/add', {
    method: 'POST',
    body: JSON.stringify({
      friend_id: friendId,
      friend_name: friendName,
      user_id: friendId
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.ok) {
    document.location.replace('/results')
    alert('Friend added.')
  } else {
    alert('Failed to add friend or they are already your friend')
  }
}

document
  .querySelector('#add')
  .addEventListener('click', friendFormHandler)
