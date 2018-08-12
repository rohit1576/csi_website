$(function() {
    var details = ["Paavini Nanda", "paavininanda", "Director, Technology",
                   "Mohammad Salik", "salik", "Director, Technology",
                   "Tanya Gupta", "tanyagupta", "Director, Operations",
                   "Sameer Garg", "sameergarg", "Director, Finance",
                   "Karanjot Singh", "karanjotsingh", "Director, Web",
                   "Aabhas Gupta", "aabhasgupta", "Director, Public Relations",
                "Ashish Yadav", "unknown-male", "Senior Coordinator",
                "Ashwani Singh", "unknown-male", "Senior Coordinator",
                "Jayank Mayukh", "jayankmayukh", "Senior Coordinator",
                "Shubham Priyadarshi", "shubhampriyadarshi", "Senior Coordinator"
                ];
    
    var cover = $('#cover');
    
    for(i=0;i<details.length;i+=3)
        {
            var imgadd = details[i].replace(' ','').toLowerCase();
            cover.append('<div class="person">' +
                    '<img src="https://raw.githubusercontent.com/CSI-NSIT/csinsit.org/master/img/team/'+details[i+1]+'.jpg" onerror=this.src="https://raw.githubusercontent.com/CSI-NSIT/csinsit.org/master/img/team/unknown-female.jpg">' +
                            '<p>'+details[i]+'<br>' +
                            details[i+2]+' </p>' +
                        '</div>');
        }
    cover.append('<br><br><br><br>');
    
    cover.append('<div class="person">' +
            '<img src="https://avatars0.githubusercontent.com/u/24352485?s=400&v=4">'+
            '<p>Rohit Suri<br>'+
            'Board Member</p>'+
        '</div>');
    
    cover.append('<div class="person">' +
            '<img src="https://avatars3.githubusercontent.com/u/26252118?s=400&v=4">'+
            '<p>Anshul Mittal<br>'+
            'Board Member</p>'+
        '</div>');
    
    cover.append('<div class="person">' +
            '<img src="https://avatars1.githubusercontent.com/u/25114873?s=460&v=4">'+
            '<p>Parikansh Ahluwalia<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/sanchit.jpg">'+
            '<p>Sanchit Aggarwal<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/TanviDadu.jpg">'+
            '<p>Tanvi Dadu<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/rahmeenhabib.jpg">'+
            '<p>Rahmeen Habib<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/mayurvaid.JPG">'+
            '<p>Mayur Vaid<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/jaikirat.jpg">'+
            '<p>Jaikirat Singh<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/ishanarora.jpg">'+
            '<p>Ishan Arora<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/abhishekvanjani.jpg">'+
            '<p>Abhishek Vanjani<br>'+
            'Board Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/awesid.jpg">'+
            '<p>Siddharth Narayan<br>'+
            'Board Member</p>'+
        '</div>');
});