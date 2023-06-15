/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const url = "http://localhost:8081/";

function sendRequest(endPoint, method, data){
    let request = new XMLHttpRequest();
    request.open(method, url + endPoint);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type','application/json');
    request.send(data ? JSON.stringify(data): data);
    return request;
};

