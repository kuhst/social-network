import profileReducer, { addPost, deletePost } from "./ProfileReducer";



test('text of add post should be correct', () => {
	// 1. Test data
	let action = addPost('my test');
	let state = {
		posts: [
			{ id: 1, message: 'Hi! It\'s my first post in my social network', likesCount: 1 },
			{ id: 2, message: 'All work', likesCount: 2 },
			{ id: 3, message: 'Some post here', likesCount: 5 },
			{ id: 4, message: 'Long post.', likesCount: 0 },
		],
	}

	// 2. action creator
	let newState = profileReducer(state, action)

	// 3. expectation
	expect(newState.posts[4].message).toBe('my test')
});

test('length of post should be incremented', () => {
	// 1. Test data
	let action = addPost('my test');
	let state = {
		posts: [
			{ id: 1, message: 'Hi! It\'s my first post in my social network', likesCount: 1 },
			{ id: 2, message: 'All work', likesCount: 2 },
			{ id: 3, message: 'Some post here', likesCount: 5 },
			{ id: 4, message: 'Long post.', likesCount: 0 },
		],
	}

	// 2. action creator
	let newState2 = profileReducer(state, action)

	// 3. expectation
	expect(newState2.posts.length).toBe(5)
});

test('after deleting length should be decremented', () => {
	// 1. Test data
	let action = deletePost(3);
	let state = {
		posts: [
			{ id: 1, message: 'Hi! It\'s my first post in my social network', likesCount: 1 },
			{ id: 2, message: 'All work', likesCount: 2 },
			{ id: 3, message: 'Some post here', likesCount: 5 },
			{ id: 4, message: 'Long post.', likesCount: 0 },
		],
	}

	// 2. action creator
	let newState = profileReducer(state, action)

	// 3. expectation
	expect(newState.posts.length).toBe(3)
});