export const parser = (string) =>{
    string = string.split('')
    for (let i=0; i<string.length-1; i++){
        if (string[i].toUpperCase() != string[i] && string[i] != ' '){
            if (string[i+1].toUpperCase() == string[i+1] && string[i+1] != '.' && string[i+1] != ' ') string.splice(i+1,0,', ')
        }
    }
    return string.join('')
}   