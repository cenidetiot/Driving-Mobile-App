export default {
	alertsScreen : {
		container: {
	    	flex: 1,
	    	marginTop:55,
		}, 
	  	icon: { 
	    	width: 30,
	    	height: 25,
		},
		header: {
	    	paddingTop: 16
		},
		text: {
	    	marginTop: 20
		},
		imageLogo : {
    		width : 100,
    		height: 100,
   			marginBottom : 1
  		},
  		title : {
    		fontSize : 20,
    		fontWeight :"bold",
    		color: "#2c3e50"
  		},
  		button: {
  			flex: 2
  		},
  		actionButtonIcon: {
    		fontSize: 20,
    		height: 22,
    		color: 'white',
  		},
  		card : {
    		backgroundColor: "white",
    		margin : 3
  		},
  		cardContainer:{
    		flexDirection: 'row',
    		alignItems:'center', 
    		marginTop: 13,
    		marginBottom :13
  		},
  		cardAvatar:{
    		flex:1,
    	alignItems:'center', 
  		}
	},
	homeScreen : {
		container: {
		    flex: 1,
		    marginTop:45,
		   alignItems: 'center',
	     backgroundColor:'#e8eaf6'
		}, 
		  icon: { 
		    width: 30,
		    height: 25,
		},
		header: {
		    paddingTop: 16
		},
		text: {
		    marginTop: 20
		},
		imageLogo : {
	    	width : 400,
	    	height: 400
		},
		title : {
		    fontSize : 20,
		    fontWeight :"bold",
		    color: "#2c3e50"
		},
		button: {
		  	flex: 2
		},
		actionButtonIcon: {
		    fontSize: 20,
		    height: 22,
		    color: 'white',
		},
		cardContainer:{
		    alignItems:'center', 
		    marginTop: 13,
		    marginBottom :13,
		},
		cardAvatar:{
		    flex:1,
		    alignItems:'center', 
		}

	},
	loadingScreen :{
		container: {
		    flex: 1,
		    marginTop: '60%',
		   	alignItems: 'center'
		}
	},
	loginScreen : {
		container: {
		    flex: 1,
		backgroundColor: '#34495e',
		    alignItems: 'center',
		    justifyContent: 'center',
		    width : null,
		    height: null

		},
		title : {
		    fontSize : 20,
		    fontWeight :"bold",
		    color: "white"
		},
		imageLogo : {
		    width : 100,
		    height: 100,
		    marginBottom : 1,
		    
		},
		input :{
		    marginBottom : 20,
		    width : '80%',
		    height: 60,
		    fontWeight :"bold",
		    color : 'white',
		    borderBottomColor : 'white'
		}
	},
	makeAlertsScreen :{
		container: {
		    flex: 1,
		    marginTop:55,
	      backgroundColor : 'white'
	      //alignItems: 'center'
		}, 
		  icon: { 
		    width: 30,
		    height: 25,
		},
		header: {
		    paddingTop: 16
		},
		text: {
		    marginTop: 20
		},
		imageLogo : {
	    	width : 200,
	    	height: 200,
	    	marginBottom : 20,
	    
	  	},
		title : {
		    fontSize : 20,
		    marginBottom : 20,
		    marginTop : 20,
		    fontWeight :"bold",
		    color: "#2c3e50"
		},
		button: {
		 	flex: 1,
		    marginLeft : 20
		},
		form:{
		    backgroundColor : 'red'
		},
		input:{
		    margin : 10
		}

	},
	mapScreen :{
		container: {
		    flex: 1,
		    alignItems: 'stretch',
		    marginTop:50
		},
		mapContainer: {
		    flex: 4,
		    alignItems: 'center',
		    justifyContent: 'center',
		    backgroundColor: '#ecf0f1',
		},
		map: {
		    flex: 1,
		},
		scrollView: {
		    flex: 2
		},
		icon: {
		    width: 30,
		    height: 28,
		}
	},
	profileScreen : {
		container: {
		    flex: 1,
		    marginTop:55,
		    margin:5
		}, 
		icon: { 
		    width: 30,
		    height: 25,
		},
		header: {
		    paddingTop: 16
		},
		text: {
		    marginTop: 20,
		    fontWeight:'bold'
		},
		textinput : {
		   color: "#e74c3c"
		}
	},
	signUpScreen :{
		container: {
		    marginTop:55,
	      	margin:5
		}, 
		icon: { 
		    width: 30,
		    height: 25,
		},
		header: {
		    paddingTop: 16
		},
		text: {
		    marginTop: 20,
	        fontWeight:'bold'
		},
	  	textinput : {
	    	color: "#e74c3c"
	  	}
	},
	userContactScreen :{
		container: {
		    flex: 1,
		    marginTop:55,
		    margin:5
	    }, 
		icon: { 
		    width: 30,
		    height: 25,
		},
		header: {
		    paddingTop: 16
		  },
		text: {
		    marginTop: 20,
		    fontWeight:'bold'
		},
		textinput : {
		  color: "#e74c3c"
		}
	}


}