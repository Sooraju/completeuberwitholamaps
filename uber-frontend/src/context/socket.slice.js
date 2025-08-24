import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
const SOCKET_SERVER_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';
let socketInstance = null;
const initialState = {
  isConnected: false,      
  connectionError: null,   
};
export const connectSocket = createAsyncThunk(
  'socket/connect',
  async (_, { dispatch, getState }) => {
    if (socketInstance && socketInstance.connected) {
      console.log('Socket.IO: Already connected or connection in progress.');
      return { status: 'already_connected', socketId: socketInstance.id };
    }
    if (!socketInstance) {
      console.log(`Socket.IO: Attempting to connect to ${SOCKET_SERVER_URL}`);
      socketInstance = io(SOCKET_SERVER_URL);
    } else {
      socketInstance.connect();
    }
    socketInstance.on('connect', () => {
      console.log('Socket.IO: Client Connected!');
      dispatch(setConnected(true));       // Update Redux state to connected
      dispatch(setConnectionError(null)); // Clear any previous connection errors
    });
    socketInstance.on('disconnect', (reason) => {
      console.log(`Socket.IO: Client Disconnected. Reason: ${reason}`);
      dispatch(setConnected(false));      
    });
    socketInstance.on('connect_error', (error) => {
      console.error('Socket.IO: Connection Error:', error.message);
      dispatch(setConnectionError(error.message)); 
      dispatch(setConnected(false));              
    });

    
    return { status: 'connection_attempted', socketId: socketInstance.id };
  }
);

export const disconnectSocket = createAsyncThunk(
  'socket/disconnect',
  async (_, { dispatch }) => {
    if (socketInstance && socketInstance.connected) {
      console.log('Socket.IO: Disconnecting client...');
      socketInstance.disconnect(); 
      socketInstance = null;     
      dispatch(setConnected(false));
      dispatch(setConnectionError(null)); 
      return 'disconnected_successfully';
    } else {
      console.log('Socket.IO: No active connection to disconnect.');
      return 'not_connected_to_disconnect';
    }
  }
);
const getSocket = () => socketInstance;
const socketSlice = createSlice({
  name: 'socket', 
  initialState,   
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setConnectionError: (state, action) => {
      state.connectionError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state, action) => {
        console.log('Socket connect thunk result:', action.payload.status);
      })

      .addCase(connectSocket.rejected, (state, action) => {
        console.error('Socket connect thunk failed:', action.error.message);
        state.isConnected = false;
        state.connectionError = action.error.message || 'Connection failed';
      })
      .addCase(disconnectSocket.fulfilled, (state, action) => {
        console.log('Socket disconnect thunk result:', action.payload);
        state.isConnected = false; 
        state.connectionError = null; 
      });
  },
});
export const { setConnected, setConnectionError } = socketSlice.actions;
export { getSocket }; // Export getSocket here
export default socketSlice.reducer;
