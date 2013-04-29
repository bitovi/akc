// map fixtures for this application
steal("can/util/fixture", function(fixture) {


	var eventNames = [
		"Dalmatian Club of the Piedmont",
		"Central Carolina Cavalier King Charles",
		"Durham Kennel Club",
		"Chinese Shar-Pei Club"],
		competitions = [{
			id: "S",
			name: "Specialty",
			competitionGroup: {}
		},
		{
			id: "OPNC",
			name: "?",
			competitionGroup: {}
		},
		{
			id: "O",
			name: "?",
			competitionGroup: {}
		},
		{
			id: "PS",
			name: "?",
			competitionGroup: {}
		},
		{
			id: "SWPC",
			name: "?",
			competitionGroup: {}
		}],
		eventStatus = [{ id: "INIT", name: "Initialize" },
			{ id: "PLAN", name: "Planning" },
			{ id: "PEND", name: "Pending ACK Approval" }],
		panelStatus = [
			{ id: "PLAN", name: "Planning" },
			{ id: "PEND", name: "Pending ACK Approval" },
			{ id: "APPR/AOVD", name: "Approved/Approved with Overrides"}
		],
		states = ["IL","KY","NC","MN"],
		clubs = [{
			id: 123,
			name: "Dalmatian Club"
		},{
			id: 124,
			name: "Central Carolina"
		},{
			id: 125,
			name: "Chinese Shar-Pei Club"
		}]


	var eventsStore = fixture.make(1000,function(id){
		var club = clubs[ id % 3 ];
		return {
			name: fixture.rand(eventNames,1)[0],
			competitions: fixture.rand(competitions),
			eventStatus: fixture.rand(eventStatus,1)[0],
			panelStatus: fixture.rand(panelStatus,1)[0],
			state: fixture.rand(states, 1)[0],
			club: club,
			clubId: club.id,
			startDate: Math.floor(Math.random() * new Date(2014,0).getTime())
		}
	}, function(event, request){

		if(request.data["startDate:gt"]){

			return request.data["startDate:gt"] < event.startDate &&
				request.data["startDate:lt"] > event.startDate

		} else {
			return true;
		}

	})



	fixture("GET /events",eventsStore.findAll)


});