$(document).ready(function(){
    $('#searchBtnDates').click(function(){
        var du = $('#du_input').val();
        var au = $('#au_input').val();
        var du_date = new Date(du);
        var au_date = new Date(au);
		$.ajax({
		    url: '/contrevenants',
			type: 'GET',
			data: {du: du, au: au},
			success: function(result){
			    if(result.length == 0) {
				    showError('Aucun résultats');
				} else {
				    $('.alert-danger').addClass('hidden');
				    var html = "";
					result.forEach(function(contrevenant){
					    html += "<tr> \
								<td>" + contrevenant.proprietaire + "</td>\
								<td>" + contrevenant.categorie + "</td>\
								<td>" + contrevenant.etablissement + "</td>\
								<td>" + contrevenant.adresse + "</td>\
								<td>" + contrevenant.ville + "</td>\
								<td>" + contrevenant.description + "</td>\
								<td>" + contrevenant.date_infraction_text + "</td>\
								<td>" + contrevenant.date_jugement_text + "</td>\
								<td>" + contrevenant.montant + "</td>\
								</tr>";
					});
					$('.table thead').html(html);
					$('.table').removeClass('hidden');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
			   showError(JSON.parse(xhr.responseText).error);
			}
		});
    });
    $('#searchBtnNom').click(function(){
        var nom_contrevenant = $('#nom_contrevenant').val();
		$.ajax({
		    url: '/contrevenants',
			type: 'GET',
			data: {nom_contrevenant: nom_contrevenant},
			success: function(result){
			   if(result.length == 0) {
			       showError('Aucun résultats');
			   } else {
			       $('.alert-danger').addClass('hidden');
			       var html = "";
			       result.forEach(function(contrevenant){
				       html += "<tr> \
							   <td>" + contrevenant.proprietaire + "</td>\
							   <td>" + contrevenant.categorie + "</td>\
							   <td>" + contrevenant.etablissement + "</td>\
							   <td>" + contrevenant.adresse + "</td>\
							   <td>" + contrevenant.ville + "</td>\
							   <td>" + contrevenant.description + "</td>\
							   <td>" + contrevenant.date_infraction_text + "</td>\
							   <td>" + contrevenant.date_jugement_text + "</td>\
							   <td>" + contrevenant.montant + "</td>\
							   </tr>";
				   });
			       $('.table thead').html(html);
			       $('.table').removeClass('hidden');
			   }
		    },
			error: function(xhr, ajaxOptions, thrownError) {
			    showError(JSON.parse(xhr.responseText).error);
			}
	    });
    });
});
function showError(errorMessage) {
    $('.alert-danger').text(errorMessage);
    $('.alert-danger').removeClass('hidden');
    $('.table').addClass('hidden');
}