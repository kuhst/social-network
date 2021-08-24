import { APIResponseType, ResultCodeEnum } from '../api/api';
import { usersAPI } from '../api/usersAPI';
import { follow } from './UsersReducer';

jest.mock('../api/usersAPI')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})

const result: APIResponseType = {
	resultCode: ResultCodeEnum.Success,
	messages: [],
	data: {}
}

// @ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result));


test('success follow thunk', async () => {
	const thunk = follow(2)

	// @ts-ignore
	await thunk(dispatchMock, getStateMock, {})
	
	expect(dispatchMock).toBeCalledTimes(3)
})