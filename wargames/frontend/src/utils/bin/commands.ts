// List of commands that do not require API calls

import * as bin from "./index";
import config from "../../../config.json";

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(", ");
  var c = "";
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + "\n";
    } else {
      c += Object.keys(bin).sort()[i - 1] + " ";
    }
  }
  return `
  +---------------+--------------------------+
  |    Command    |          Usage           |
  +===============+==========================+
  | Submit        | submit {USERNAME}:{FLAG} |
  | Ranking Table | show all                 |
  | User Stats    | show {USERNAME}          |
  | Get Username  | username {email}         |
  +---------------+--------------------------+
  
`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return ` 
   █████   ███   █████                                                                                     
  ░░███   ░███  ░░███                                                                                      
   ░███   ░███   ░███   ██████   ████████   ███████  ██████   █████████████    ██████   █████              
   ░███   ░███   ░███  ░░░░░███ ░░███░░███ ███░░███ ░░░░░███ ░░███░░███░░███  ███░░███ ███░░               
   ░░███  █████  ███    ███████  ░███ ░░░ ░███ ░███  ███████  ░███ ░███ ░███ ░███████ ░░█████              
    ░░░█████░█████░    ███░░███  ░███     ░███ ░███ ███░░███  ░███ ░███ ░███ ░███░░░   ░░░░███             
      ░░███ ░░███     ░░████████ █████    ░░███████░░████████ █████░███ █████░░██████  ██████              
       ░░░   ░░░       ░░░░░░░░ ░░░░░      ░░░░░███ ░░░░░░░░ ░░░░░ ░░░ ░░░░░  ░░░░░░  ░░░░░░               
                                           ███ ░███                                                        
                                          ░░██████                                                         
                                           ░░░░░░                                                          
   █████        ███                                       ██████████    ███                                
  ░░███        ░░░                                       ░░███░░░░███  ░░░                                 
   ░███        ████  ████████   █████ ████ █████ █████    ░███   ░░███ ████   ██████   ████████  █████ ████
   ░███       ░░███ ░░███░░███ ░░███ ░███ ░░███ ░░███     ░███    ░███░░███  ░░░░░███ ░░███░░███░░███ ░███ 
   ░███        ░███  ░███ ░███  ░███ ░███  ░░░█████░      ░███    ░███ ░███   ███████  ░███ ░░░  ░███ ░███ 
   ░███      █ ░███  ░███ ░███  ░███ ░███   ███░░░███     ░███    ███  ░███  ███░░███  ░███      ░███ ░███ 
   ███████████ █████ ████ █████ ░░████████ █████ █████    ██████████   █████░░████████ █████     ░░███████ 
  ░░░░░░░░░░░ ░░░░░ ░░░░ ░░░░░   ░░░░░░░░ ░░░░░ ░░░░░    ░░░░░░░░░░   ░░░░░  ░░░░░░░░ ░░░░░       ░░░░░███ 
                                                                                                  ███ ░███ 
                                                                                                 ░░██████  
                                                                                                  ░░░░░░   
                                       █████ █████        █████                                            
                                      ░░███ ░░███       ███░░░███                                          
                                       ░███  ░███ █    ███   ░░███                                         
                                       ░███████████   ░███    ░███                                         
                                       ░░░░░░░███░█   ░███    ░███                                         
                                             ░███░    ░░███   ███                                          
                                             █████  ██ ░░░█████░                                           
                                            ░░░░░  ░░    ░░░░░░                                            
                                                                                                           
                                                                                                           
                                                                                                           
`;
};
