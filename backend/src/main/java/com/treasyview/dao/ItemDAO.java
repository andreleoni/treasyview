package com.treasyview.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.treasyview.models.Item;
import com.treasyview.util.JPAUtil;

public class ItemDAO {
	private static EntityManager em = new JPAUtil().getEntityManager();
	
	public static List<Item> findAllWithHierarchy() {
       List<Item> items = em.createQuery("FROM Item").getResultList();
       return items;           	   
	}
	
	public static Item create(Item item) {		
       startTransaction();
       
       em.persist(item);
       
       em.getTransaction().commit();	   
       
       return item;
	}	
	
	public static Item update(int itemId, String title, String description) {	   		  
	   startTransaction();
	   
	   Item item = em.find(Item.class, itemId);
	   item.setTitle(title);
	   item.setDescription(description);
	   
	   em.getTransaction().commit();	   
	   
	   return item;
	}
	
	public static void delete(int itemId) {
	   startTransaction();
		   
	   Item item = em.find(Item.class, itemId);
	   em.remove(item);
	   
	   Query query = em.createQuery("delete Item where parent_id = :parent_id");
	   query.setParameter("parent_id", itemId);
       query.executeUpdate();
   
	   em.getTransaction().commit();	
	   
	}
	
	private static void startTransaction() {
		em.getTransaction().begin();
	}
}
