package com.treasyview.resources;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import com.treasyview.dao.ItemDAO;
import com.treasyview.models.Item;

@Path("/items")
public class ItemResource {   

   @GET
   @Path("/")
   @Produces(value = { MediaType.APPLICATION_JSON })
   public List<Item> listItems() {	   
	   return ItemDAO.findAllWithHierarchy();
   }
   
   @POST
   @Path("/")
   @Produces(value = { MediaType.APPLICATION_JSON })
   public Item create(@FormParam("parent_id") int parentId, 
		   @FormParam("title") String title, 
		   @FormParam("description") String description) {
	   	   
   	   Item item = new Item();
   	   
   	   item.setTitle(title);   	   
       item.setParent_id(parentId);       
       item.setDescription(description);
       
	   return ItemDAO.create(item);
   }
   
   @PUT
   @Path("/{itemId}")
   @Produces(value = { MediaType.APPLICATION_JSON })
   public Item update(@PathParam("itemId") int itemId,
		   @FormParam("title") String title, 
		   @FormParam("description") String description) {	   	  
	   
	   return ItemDAO.update(itemId, title, description);
   }
   
   @DELETE
   @Path("/{itemId}")
   @Produces(value = { MediaType.APPLICATION_JSON })
   public void update(@PathParam("itemId") int itemId) {	   
	   ItemDAO.delete(itemId);
   }
}
