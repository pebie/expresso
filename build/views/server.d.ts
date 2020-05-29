import { ExpressoCall } from './components/definitions';
import { ExpressoHttpInterceptorData } from '../interceptors/definitions';
export declare const handleRender: (originalCall: ExpressoCall, underlyingCalls: ExpressoHttpInterceptorData[]) => any;
export declare const renderFullPage: (html: any, preloadedState: any) => any;
