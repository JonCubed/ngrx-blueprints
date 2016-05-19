import { Reducer, Action } from '@ngrx/store'

interface I<%= classifiedModuleName %>State {
}

export const <%= classifiedModuleName %>InitialState:I<%= classifiedModuleName %>State = {
}

export const <%= classifiedModuleName %>Reducer:Reducer<I<%= classifiedModuleName %>State> = (state:I<%= classifiedModuleName %>State = <%= classifiedModuleName %>InitialState, action: Action) => {        
    
    return state; 
}