$(function() {
    var details = ["Prachi Manchanda", "prachimanchanda", "Director, Technology",
                   "Sarthak Agarwal", "sarthakagarwal", "Director, Operations",
                   "Karanjot Singh", "karanjotsingh", "Senior Board Member",
                   "Mansimar Kaur", "mansimar", "Senior Board Member",
                   "Kamakshi Suri", "kamakshisuri", "Senior Board Member",
                "Ayush Garg", "ayushgarg2018", "Senior Board Member",
                "Sagorika Das", "sagorikadas", "Senior Board Member",
                "Shivli Aggarwal", "shivliagrawal", "Senior Board Member",
                "Sijal Bhatnagar"," ","Senior Board Member",
                "Deepika Naryani", "deepikanaryani", "Senior Board Member"
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
    cover.append('<div class="person">' +
            '<img src="https://scontent.fdel1-3.fna.fbcdn.net/v/t1.0-9/20228255_10212224747706714_4601278246039480447_n.jpg?_nc_cat=0&oh=6a881d68051e6a36b854005103c155b8&oe=5B65EBBC">'+
            '<p>Vidit Bhargava<br>'+
            'Senior Board Member</p>'+
        '</div>');
    
    cover.append('<br><br><br><br>');
    
    cover.append('<div class="person">' +
            '<img src="https://avatars0.githubusercontent.com/u/24352485?s=400&v=4">'+
            '<p>Rohit Suri<br>'+
            'Executive Member</p>'+
        '</div>');
    
    cover.append('<div class="person">' +
            '<img src="https://avatars3.githubusercontent.com/u/26252118?s=400&v=4">'+
            '<p>Anshul Mittal<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="https://avatars1.githubusercontent.com/u/25114873?s=460&v=4">'+
            '<p>Parikansh Ahluwalia<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/TanviDadu.jpg">'+
            '<p>Tanvi Dadu<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/rahmeenhabib.jpg">'+
            '<p>Rahmeen Habib<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/mayurvaid.JPG">'+
            '<p>Mayur Vaid<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/jaikirat.jpg">'+
            '<p>Jaikirat Singh<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/ishanarora.jpg">'+
            '<p>Ishan Arora<br>'+
            'Executive Member</p>'+
        '</div>');
    cover.append('<div class="person">' +
            '<img src="team_images/abhishekvanjani.jpg">'+
            '<p>Abhishek Vanjani<br>'+
            'Executive Member</p>'+
        '</div>');
});