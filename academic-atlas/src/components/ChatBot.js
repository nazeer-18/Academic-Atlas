import React from 'react';
import '../styles/ChatBot.css';
import Icon from '../assets/genie-svgrepo-com.svg';
import ChatBot from "react-chatbotify";
import aiService from '../services/aiService';

export default function Chatbot() {
    let hasError = false;
    const feedback_options=["yes","no"]
    let recentFeedback=[]

    const settings = {
        header: {title:"AI ChatBot"},
        notifications: {disabled: true},
        botBubble: {
            showAvatar:false,
            dangerouslySetInnerHtml: true
        },
        tooltip: {
            mode:"START",
            text:"Your AI chatbot is here!"
        },
        chatButton: {icon: Icon}
      }
    
      const themes = [
        {id: "minimal_midnight", version: "0.1.0"},
        {id: "simple_blue", version: "0.1.0"}
      ]

      const update_intents = async() => {
        if(recentFeedback !=null){
            aiService.updateDatabase(recentFeedback[0],recentFeedback[1]);
            // console.log("updated database");
        }
      }

      const getBetterResponse = async (params) => {
        try {
            const res= await aiService.getBetterResponse(recentFeedback[0],recentFeedback[1]);
            console.log(res);
			await params.injectMessage("Sorry,we'll try to improve next time. Here's another response for your query,\n\n\n"+res.data.betterResponse);
            recentFeedback=[recentFeedback[0],res.data.betterResponse];
            await params.goToPath("newFeedBack");
		} catch (error) {
			await params.injectMessage("Unable to load model, looks like a backend issue!");
			hasError = true;
		}
      }

      const getResponse = async (params) => {
		try {
            const res= await aiService.getChatBotResponse(params.userInput);
            // console.log(res);
			await params.injectMessage(res.data.response);
            if(res.data.ai){
                recentFeedback=[res.data.query,res.data.response];
                // console.log(recentFeedback);
                await params.goToPath("feedback");
            }
		} catch (error) {
			await params.injectMessage("Unable to load model, looks like a backend issue!");
			hasError = true;
		}
	}
    

      const flow={
		start: {
			message: "Hello, hope you are doing fine with your studies",
			path: "loop"
		},
		loop: {
			message: async (params) => {
				await getResponse(params);
			},
			path: () => {
				if (hasError) {
					return "end"
				}
				return "loop"
			}
		},
        feedback:{
            message:"Is this Helpful?",
            options: feedback_options,
            path:"process_feedback"
        },
        process_feedback:{
            transition: {duration: 0},
			chatDisabled: true,
            path: (params)=>{
                // console.log(params.userInput+"ssssssss")
                switch(params.userInput){
                    case "yes":{
                    update_intents()
                    // console.log("Received yes");
                    return "feedback_yes";
                    break;
                    }
                case "no":{
                    // console.log("Feedback no");
                    return "feedback_no";
                    break;
                }
                default:
                    return "loop";
                }
            }
        },
        feedback_yes:{
            message:"Thanks for the feedback, any other queries?",
            path:"loop"
        },
        feedback_no:{
            message:async (params) => {
				await getBetterResponse(params);
			},
            path:"newFeedBack"
        },
        newFeedBack:{
            message:"Is this new response Helpful?(you can ignore this)",
            options: feedback_options,
            path:"process_feedback"
        },
        end: {
            message: () => `Error!! \n Restart bot`,
            chatDisabled: true
          }
	}
    
    return (
        <ChatBot themes={themes} settings={settings} flow={flow}/>
    );
}
