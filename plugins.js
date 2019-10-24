import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const myPlugin = store => {
//     // Called when store is initialized
//     store.subscribe((mutation, state) => {
//         // Called after every mutation
//         // Mutation comes in the format `{ type, payload }`
//     })
// }

// function createWebSocketPlugin (socket) {
//     return store => {
//         socket.on('data', data => {
//             store.commit('receiveData', data)
//         })
//         store.subscribe(mutation => {
//             if (mutation.type === 'UPDATE_DATA') {
//                 socket.emit('update', mutation.payload)
//             }
//         })
//     }
// }

// const myPluginWithSnapshot = store => {
//     let prevState = _.cloneDeep(store.state)
//     store.subscribe((mutation, state) => {
//         let nextState = _.cloneDeep(state) 
        
//         // Compare prevState to nextState
        
//         // Save state for next mutation
//         prevState = nextState
//     })
// }

import createLogger from 'vuex/dist/logger'

const logger = createLogger({
    collapsed: false,
    filter (mutation, stateBefore, stateAfter) {
        return mutation.type !== 'aBlacklistedMutation'
    },
    transformer (state) {
        return state.subTree
    },
    mutationTransformer (mutation) {
        return mutation.type
    },
    logger: console
})

const store = new Vuex.Store({
    //...
    plugins: [createLogger()]
})

new Vue({ 
    el: '#app',
    data: {
    }
});
