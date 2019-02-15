import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    isShowModal:false,
    modalErrorMsg:'',
    modalType:0
}

const mutations={
    isShowModal(state,value){
        state.isShowModal=value;
    },
    modalErrorMsg(state,value){
        state.modalErrorMsg=value;
    },
    modalType(state,value){
        state.modalType=value;
    }
}

const getters={
    isShowModal:state=>state.isShowModal,
    modalErrorMsg:state=>state.modalErrorMsg
}

export default new Vuex.Store({state,getters,mutations})
