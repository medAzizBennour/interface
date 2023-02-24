
class MessageParser {

    constructor(actionProvider) {
      this.actionProvider = actionProvider;
      
    }
  
    parse(message) {
      
      console.log(message)
      var keys=message.split(" ");
      keys.forEach(element => {
        if(element=='go' || element=='open')
        {
          console.log(element);
          this.navigateToPage()

        }
      });
    }

     navigateToPage() {
      //const navigate = useNavigate();

      this.props.navigation('/profile');
    };
  }
  
  export default MessageParser;