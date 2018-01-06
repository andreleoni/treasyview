package com.treasyview.resources;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.treasyview.dao.ItemDAO;
import com.treasyview.models.Item;
import com.treasyview.util.ItemUtil;

@Path("/items")
public class ItemResource {

  @GET
  @Path("/")
  @Produces(value = { MediaType.APPLICATION_JSON })
  public Response listItems() {
	  try {
	    List<Item> items = ItemDAO.findAllWithHierarchy();
	    
	    String json = new Gson().toJson(items);    		
	    return Response.ok(json, MediaType.APPLICATION_JSON).build();
	    
	  } catch (Exception e) {
	    System.out.println(e);
	    return Response.serverError().entity("An error ocurrend.").build();
	  }
  }

  @POST
  @Path("/")
  @Produces(value = { MediaType.APPLICATION_JSON })
  public Response create(@QueryParam("parent_id") int parentId,
      @QueryParam("title") String title,
      @QueryParam("description") String description) {

    if (ItemUtil.invalidFields(title, description)) {
        return Response.status(400).entity("Check field validations.").build();

    } else {
      Item item = new Item();

      item.setTitle(title);
      item.setParent_id(parentId);
      item.setDescription(description);

      try {    	  
    	  	String json = new Gson().toJson(ItemDAO.create(item));
    	  	return Response.ok(json, MediaType.APPLICATION_JSON).build();
        
      } catch (Exception e) {
        System.out.println(e);
        return Response.serverError().entity("An error ocurrend.").build();
      }
    }
  }

  @PUT
  @Path("/{itemId}")
  @Produces(value = { MediaType.APPLICATION_JSON })
  public Response update(@PathParam("itemId") int itemId,
      @QueryParam("title") String title,
      @QueryParam("description") String description) {

	  if (ItemUtil.invalidFields(title, description)) {
    		return Response.status(400).entity("Check field validations.").build();
    
	  } else {
	      try {
	    	  	String json = new Gson().toJson(ItemDAO.update(itemId, title, description));
	  	  	return Response.ok(json, MediaType.APPLICATION_JSON).build();      	  
	      
	      } catch (Exception e) {
	        System.out.println(e);
	        return Response.serverError().entity("An error ocurrend.").build();
	      }
	  }
  }  

  @DELETE
  @Path("/{itemId}")
  @Produces(value = { MediaType.APPLICATION_JSON })
  public void update(@PathParam("itemId") int itemId) {
    ItemDAO.delete(itemId);
  }
}
