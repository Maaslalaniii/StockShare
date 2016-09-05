function logout() {
	$.post("/logout", (data) => {
		console.log('post to /logout succesful: ' + data)
	})
}