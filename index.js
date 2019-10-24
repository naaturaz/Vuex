Vue.config.devtools = true;

Vue.use(Vuex);

const moduleA = {
    namespaced: true,
    state: { 
        count: 3
    },
    mutations: {
        increment (state) {
            state.count++;
        },
        decrement (state) {
            state.count--;
        }
    },
    getters: {
      doubleCount (state) {
          return state.count * 2;
      }  
    },
	actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 500);
		}
	},
};

const moduleB = {
    namespaced: true,
    modules: {
        subModule: {
            namespaced: true,
            state: {
                
            },
            mutations: {
                login () {}
            },
            getters: {
              login () {}  
            },
            actions: {
              login () {}  
            }
        }
    },
    state: {
        count: 8
    },
    mutations: {
        
    },
    getters: {
        someGetter (state, getters, rootState, rootGetters) {
            rootState.count;
            state.count;
            
            getters.someOtherGetter;
            rootGetters.someOtherGetter;
        }
    },
    actions: {
        someAction({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter;
            rootGetters.someGetter;
            
            dispatch('someOtherAction');
            dispatch('someOtherAction', null, { root: true });
            
            commit('someMutation');
            commit('someMutation', null, { root: true });
        }
    }
}


const store = new Vuex.Store({
	modules: {
        a: moduleA,
        b: moduleB
    },
	state: {
		count: 0,
		message: "Hello Planet!",
		todos: [
			{ id: 1, text: '...1', done: true },
			{ id: 2, text: '...2', done: false },
		]
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done);
		},
		doneTodosCount: (state, getters) => {
			return getters.doneTodos.length;
		},
		getTodoById: (state) => (id) => {
			return state.todos.find(todo => todo.id === id);
		}
	},
	mutations: {
		increment (state) {
			state.count++;
		},
		decrement (state) {
			state.count--;
		},
		incrementBy (state, payload) {
			state.count += payload.amount;
		},
		updateMessage (state, message) {
            state.message = message;
        }
	},
	actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 500);
        },
        actionA ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment');
                    resolve();
                }, 500);
            });
        },
        actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
                commit('someOtherMutation');
            });
        },
        async actionC ({ commit }) {
            commit('gotData', await getData());
        },
        async actionD ({ dispatch, commit} ) {
            await dispatch('actionC')
            commit('gotOtherData', await getOtherData())
        }
    }
});

store.commit('incrementBy', {amount: 15});
console.log(store.state.count);

new Vue({ 
	el: '#app',
    data: {
		message: 'Hello Blue Planet!',
		testActionState: 0,
	},
	store,
	computed: {
        message: {
            get () {
                return this.$store.state.message
            },
            set (value) {
                this.$store.commit('updateMessage', value)
            }
		},
		count:  {
			get() { return this.$store.state.count; } 
		}
    },
    // computed: Vuex.mapGetters([
    //     'doneTodos', 'doneTodosCount', 'getTodoById',
	// ]),
	// computed: Vuex.mapState([
	// 	'count',
	// ]),
	// computed: Vuex.mapState({
    //     a: state => state.a.count,
    //     b: state => state.b.subModule.count,
    // }),
    // methods: Vuex.mapActions('some/nested/module', [
    //     'foo' // this.foo()
    // ])
	// methods: Vuex.mapMutations([
    //     'increment',
    //     'incrementBy'
	// ]),
	methods: {
        increment () {
            this.$store.dispatch('incrementAsync');
            // this.$store.dispatch('a/incrementAsync');
        },
        decrement () {
			this.$store.commit('decrement');
            // this.$store.commit('a/decrement');
        },
        testAction () {
            this.$store.dispatch('actionA').then(() => {
				console.log("actionA done");
				this.testActionState++;
            })
        }
    }
});

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;