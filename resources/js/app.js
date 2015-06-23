/* Email munge */
$(function() {
    var username = "blockapps";
    var hostname = "consensys.net";
    var linktext = username + "@" + hostname;

    $("#blockapps-email").html("<a href='" +
    	"mail" + "to:" + username + "@" +
    	hostname + "'>" + linktext + "</a>");
});